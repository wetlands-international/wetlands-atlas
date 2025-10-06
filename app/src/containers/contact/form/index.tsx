import { FC, useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  organization: z.string().optional(),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

const ContactForm: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("contact.form");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/send", { method: "POST", body: JSON.stringify(values) });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <h2 className="font-display text-xl">{t("submitted.title")}</h2>
        <p>{t("submitted.description")}</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name.label")}*</FormLabel>
              <FormControl>
                <Input className="rounded-3xl" placeholder={t("name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("organization.label")}</FormLabel>
              <FormControl>
                <Input
                  className="rounded-3xl"
                  placeholder={t("organization.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email.label")}*</FormLabel>
              <FormControl>
                <Input className="rounded-3xl" placeholder={t("email.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("message.label")}*</FormLabel>
              <FormControl>
                <Textarea
                  className="rounded-3xl"
                  placeholder={t("message.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="rounded-full py-3.5 leading-5 font-normal" size="lg" type="submit">
          {t("button")}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
