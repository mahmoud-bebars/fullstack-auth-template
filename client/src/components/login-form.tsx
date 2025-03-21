import { useContext, useState } from "react";
import { Link, redirect, useLocation } from "react-router-dom";
import { AuthContext } from "./auth-provider";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import Axios from "axios";
import { API } from "@/constants/env";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().nonempty("Please enter your email address").email({
    message: "Please enter a valid email address",
  }),
  password: z.string().nonempty("Please enter your password").min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type LoginFormProps = React.ComponentProps<"div">;

const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const { state } = useLocation();
  const { setUser } = useContext(AuthContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    Axios.post(API + "/auth/login", values)
      .then((response) => {
        const data = response.data;
        // Set The AccessToken in local storage
        localStorage.setItem("Authorization", `bearer ${data.access_token}`);

        // Setting Authorization as Deafult in Headers
        Axios.defaults.headers.common[
          "Authorization"
        ] = `bearer ${data.access_token}`;

        // Read the Incoming Data from Respones & Set the needed one Only
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
        });

        // Reset the Form
        form.reset();
        // Redirect to the Home Page or the Previous Page if it exists in the state object under history key
        redirect(state && state.history ? state.history : "/");
        toast.success(`Welcome Back ${data.name}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);

        form.reset();
      });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="p-0 overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your Acme Inc account
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
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
                      <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Button
                          variant="ghost"
                          type="button"
                          disabled={form.formState.isSubmitting}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          Show Password
                        </Button>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="********"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="default"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

                <Link
                  to="/forgot-password"
                  aria-disabled={form.formState.isSubmitting}
                  className="text-sm text-muted-foreground text-center hover:underline underline-offset-4"
                >
                  Forgot your password?
                </Link>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    aria-disabled={form.formState.isSubmitting}
                    to="/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="h-full relative hidden bg-muted md:block">
            <img
              src="/login.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
