"use client";

"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

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
import { validateApartment } from "@/lib/validators/apartment";
import { validateMercosul } from "@/lib/validators/mercosul";
import { Textarea } from "@/components/ui/textarea";
import { createVehicleGuest } from "@/api/guests";

const schema = z.object({
  name: z.string().min(1, { message: "Nome e sobrenome é obrigatório" }),
  entryDate: z.date(),
  entryHour: z.string().min(1, { message: "Hora de entrada é obrigatório" }),
  pax: z.coerce.number().min(1, { message: "Número de pessoas é obrigatório" }),
  plate: z
    .string()
    .min(1, {
      message: "Placa é obrigatório",
    })
    .refine(validateMercosul, {
      message: "Placa inválida",
    }),
  model: z.string().min(1, { message: "Modelo é obrigatório" }),
  apartment: z.coerce.number().refine(validateApartment, {
    message: "Apartamento inválido",
  }),
  isInside: z.boolean(),
  observations: z.string(),
});

export default function CreateVehicleClient({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      entryDate: new Date(),
      entryHour: "",
      pax: 1,
      plate: "",
      model: "",
      apartment: 0,
      observations: "",
      isInside: true,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await createVehicleGuest(
        values.name,
        values.model,
        values.pax,
        values.entryDate,
        values.entryHour,
        userId,
        values.isInside,
        values.plate,
        values.apartment,
        values.observations
      );

      toast.success("Passante criado com sucesso!");
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 mb-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome e sobrenome</FormLabel>
                <FormControl>
                  <Input type="text" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input type="text" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  A placa precisa ser no formato válido do mercosul.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isLoading}
                    placeholder="Ex: Gol, Uno, Palio, etc..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Caso não saiba o modelo, coloque a marca do veículo.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passageiros</FormLabel>
                <FormControl>
                  <Input type="number" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Coloque a quantidade de passageiros no veículo.
                </FormDescription>
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
            name="observations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Observações sobre o visitante, como por exemplo, o motivo da visita."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Observações não são obrigatórias e não precisam ser
                  preenchidas
                </FormDescription>
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
                    className="w-1/5 pl-3 text-left font-normal"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="w-4/6">
                  Deixe com 0 caso o visitante não esteja em um apartamento
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
}
