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
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signOut } from "next-auth/react";
import { updateUser } from "@/api/users";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
    .max(20, { message: "Nome deve ter no máximo 20 caracteres" }),
  username: z
    .string()
    .min(3, { message: "Usuário deve ter no mínimo 3 caracteres" })
    .max(20, { message: "Usuário deve ter no máximo 20 caracteres" }),
});

export default function EditProfile({
  initialData,
}: {
  initialData: {
    id: string;
    name: string;
    username: string;
  };
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await updateUser(initialData.id, values.name, values.username);

      toast.success("Perfil atualizado com sucesso, você será deslogado.");
      setTimeout(() => {
        signOut();
      }, 2000);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto space-y-2 mt-2"
      >
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
