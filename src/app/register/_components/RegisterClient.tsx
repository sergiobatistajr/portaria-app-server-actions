"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Role, User } from "@/api/types";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
      .max(20, { message: "Nome deve ter no máximo 20 caracteres" }),
    username: z
      .string()
      .min(3, { message: "Usuário deve ter no mínimo 3 caracteres" })
      .max(20, { message: "Usuário deve ter no máximo 20 caracteres" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(20, {
        message: "Senha deve ter no máximo 20 caracteres",
      }),
    confirm_password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
      .max(20, {
        message: "Senha deve ter no máximo 20 caracteres",
      }),
    role: z.enum(["admin", "relatorio", "porteiro"]),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Senhas não conferem",
    path: ["confirm_password"],
  });

const role = ["admin", "relatorio", "porteiro"] as const;

export default function RegisterClient({
  createUserAction,
}: {
  createUserAction(
    name: string,
    username: string,
    password: string,
    role: Role
  ): Promise<User>;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirm_password: "",
      role: "porteiro",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await createUserAction(
        data.name,
        data.username,
        data.password,
        data.role
      );
      toast.success("Usuário cadastrado com sucesso");
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }
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
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
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
                <Input type="text" {...field} />
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
                <Input type="password" {...field} />
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
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {role.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div>
          <Button disabled={isLoading} type="submit">
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
