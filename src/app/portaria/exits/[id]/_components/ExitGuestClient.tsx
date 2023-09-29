"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { validateApartment } from "@/lib/validators/apartment";
import { Textarea } from "@/components/ui/textarea";
import { createExitGuest, createGuest } from "@/api/guests";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExitGuestClientProps {
  exitGuest: {
    id: string;
    name: string;
    entryDate: string;
    plate?: string;
    apartment?: string;
    observations?: string;
  };
}

export default function ExitGuestClient({ exitGuest }: ExitGuestClientProps) {
  const schema = z
    .object({
      exitDate: z.date(),
      exitHour: z.string().min(1, {
        message: "Hora obrigatória",
      }),
    })
    .refine(
      (data) => {
        const extrated = format(data.exitDate, "yyyy/MM/dd");
        const exit = new Date(`${extrated} ${data.exitHour}`);

        const entry = new Date(exitGuest.entryDate);

        return exit > entry;
      },
      {
        message: "Data de saída deve ser maior que a data de entrada",
        path: ["exitDate"],
      }
    );

  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      exitDate: new Date(),
      exitHour: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await createExitGuest(exitGuest.id, values.exitDate, values.exitHour);
      toast.success("Saída registrada com sucesso");
      router.push("/portaria/exits");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <Card>
          <CardHeader>
            <CardTitle>{exitGuest.name}</CardTitle>
            <CardDescription>{exitGuest.entryDate}</CardDescription>
          </CardHeader>
          <CardContent>
            {exitGuest.observations && (
              <Textarea defaultValue={exitGuest.observations} />
            )}
          </CardContent>
          <CardFooter>
            {exitGuest.apartment && (
              <div>
                Placa <span className="font-bold">{exitGuest.plate}</span>
                <p>
                  Apartamento{" "}
                  <span className="font-bold">{exitGuest.apartment}</span>
                </p>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="exitDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de saída</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[140px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onDayClick={field.onChange}
                        locale={ptBR}
                        disabled={isLoading}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exitHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora da saída</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="time"
                      {...field}
                      className="w-1/14 pl-3 text-left font-normal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salvar saída</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
