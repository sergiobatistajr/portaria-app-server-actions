"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

import { changePassword } from "@/api/users";

const schema = z
  .object({
    password: z
      .string()
      .min(6, { message: "A nova senha deve ter no mínimo 6 caracteres" })
      .max(20, {
        message: "A nova senha deve ter no máximo 20 caracteres",
      }),
    confirm_password: z
      .string()
      .min(6, { message: "A nova senha deve ter no mínimo 6 caracteres" })
      .max(20, {
        message: "A nova senha deve ter no máximo 20 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

export default function ResetPasswordClient({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await changePassword(id, values.password);

      toast.success("Senha resetada com sucesso");
      router.push("/users");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto space-y-2 mt-2">
      <h1 className="font-extrabold space-y-2 flex justify-center">{name}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar a nova senha</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            Salvar nova senha
          </Button>
        </form>
      </Form>
    </div>
  );
}
