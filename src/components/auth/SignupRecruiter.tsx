import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Upload } from "lucide-react";
import { useAuth } from "../../useAuth/AuthContext.tsx";

// Create a schema for form validation
const recruiterFormSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  companyInfo: z
    .string()
    .min(50, "Company information must be at least 50 characters"),
  logo: z.string().optional(),
});

interface SignupRecruiterProps {
  onSubmit: (data: z.infer<typeof recruiterFormSchema>) => void;
}

export const SignupRecruiter = ({ onSubmit }: SignupRecruiterProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof recruiterFormSchema>>({
    resolver: zodResolver(recruiterFormSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      companyInfo: "",
      logo: "",
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        form.setValue("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data: z.infer<typeof recruiterFormSchema>) => {
    setIsLoading(true);

    try {
      await signUp(
        data.email,
        data.password,
        {
          companyName: data.companyName,
          companyInfo: data.companyInfo,
          logo: data.logo,
        },
        "recruiter"
      );

      onSubmit(data);
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 py-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="company@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormLabel>Company Logo</FormLabel>
            <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-48">
              {logoPreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0"
                    onClick={() => {
                      setLogoPreview(null);
                      form.setValue("logo", "");
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="h-10 w-10 mb-2" />
                  <p className="text-sm font-medium">
                    Upload your company logo
                  </p>
                  <p className="text-xs">PNG, JPG up to 5MB</p>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      document.getElementById("logo-upload")?.click();
                    }}
                  >
                    Select File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="companyInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Information</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide detailed information about your company, industry, and what you're looking for in candidates..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Recruiter Account"
          )}
        </Button>
      </form>
    </Form>
  );
};