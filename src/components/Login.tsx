"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Usuário deve ter no mínimo 3 caracteres",
    })
    .max(20, {
      message: "Usuário deve ter no máximo 20 caracteres",
    }),
  password: z
    .string()
    .min(6, {
      message: "Senha deve ter no mínimo 6 caracteres",
    })
    .max(20, {
      message: "Senha deve ter no máximo 20 caracteres",
    }),
});

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!res || res?.error) throw new Error("Usuário ou senha inválidos");

      toast.success("Login realizado com sucesso");
      form.reset();
      router.refresh();
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button disabled={isLoading} type="submit">
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
