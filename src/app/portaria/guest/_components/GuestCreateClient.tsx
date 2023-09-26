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
import { Guest } from "@/api/types";

const schema = z.object({
  name: z.string().min(3),
  isInside: z.boolean(),
  entryDate: z.date(),
  entryHour: z.string(),
  apartment: z.coerce.number().optional(),
});

export default function GuestCreateClient({
  createGuestAction,
}: {
  createGuestAction: (
    name: string,
    isInside: boolean,
    entryDate: Date,
    entryHour: string,
    apartment?: number
  ) => Promise<Guest>;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      isInside: true,
      entryDate: new Date(),
      entryHour: "",
      apartment: 0,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await createGuestAction(
        values.name,
        values.isInside,
        values.entryDate,
        values.entryHour,
        values.apartment
      );
      toast.success("Passante criado com sucesso!");
      form.reset();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome e sobrenome</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de entrada</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
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
            name="entryHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora da entrada</FormLabel>
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
          <FormField
            control={form.control}
            name="apartment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apartamento?</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="number"
                    {...field}
                    className="w-1/2 pl-3 text-left font-normal"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="w-4/6">
                  Deixe em branco caso o visitante não esteja em um apartamento
                </FormDescription>
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
}
