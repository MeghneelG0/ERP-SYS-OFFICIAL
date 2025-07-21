"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, UserIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthService } from "@/services/auth.service";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = emailSchema.extend({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showOTP, setShowOTP] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("qac");
  const router = useRouter();

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (email: string) => {
    setIsLoading(true);
    const result = await AuthService.sendOtp(email);
    setIsLoading(false);

    if (result.error) {
      toast.error(result.error.message);
      return false;
    }

    toast.success("OTP sent successfully");
    startResendTimer();
    return true;
  };

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    if (!showOTP) {
      const success = await handleSendOTP(values.email);
      if (success) {
        setShowOTP(true);
      }
      return;
    }

    setIsLoading(true);
    const res = await signIn("credentials", {
      email: values.email,
      otp: values.otp,
      role: activeTab,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Invalid OTP");
    } else {
      // Redirect based on role
      const roleRoutes = {
        qac: "/qac",
        hod: "/hod",
        faculty: "/faculty",
      };
      const redirectPath =
        roleRoutes[activeTab as keyof typeof roleRoutes] || "/";
      router.push(redirectPath);
      toast.success("Logged in successfully");
    }
    setIsLoading(false);
  }

  const getRoleEmail = (role: string) => {
    const roleEmails = {
      qac: "qac@admin.com",
      hod: "hod@admin.com",
      faculty: "faculty@admin.com",
    };
    return roleEmails[role as keyof typeof roleEmails] || "";
  };

  const handleRoleChange = (role: string) => {
    setActiveTab(role);
    setShowOTP(false);
    form.reset();
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Video Section */}
      <div className="relative w-full md:w-2/3 bg-black">
        <video
          className="h-full w-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./mujvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <div className="bg-black/40 p-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-center mb-2">
              Manipal University Jaipur
            </h1>
            <p className="text-center max-w-md">
              Welcome to the official portal. Please login with your
              credentials.
            </p>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login Portal</CardTitle>
            <CardDescription className="text-center">
              Select your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="qc"
              value={activeTab}
              onValueChange={handleRoleChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="qac">QAC</TabsTrigger>
                <TabsTrigger value="hod">HOD</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
              </TabsList>

              {/* QAC Login */}
              <TabsContent value="qac">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>QAC Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="qac@admin.com"
                                className="pl-10"
                                {...field}
                                disabled={showOTP}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                              disabled={showOTP}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <AnimatePresence mode="wait">
                      {showOTP && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                  <InputOTP
                                    value={field.value}
                                    onChange={field.onChange}
                                    maxLength={6}
                                  >
                                    <InputOTPGroup>
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                      <InputOTPSlot index={3} />
                                      <InputOTPSlot index={4} />
                                      <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="text-center">
                            {resendTimer > 0 ? (
                              <p className="text-muted-foreground text-sm">
                                Resend code in {resendTimer}s
                              </p>
                            ) : (
                              <Button
                                type="button"
                                variant="link"
                                className="h-auto p-0 text-sm"
                                onClick={() =>
                                  handleSendOTP(form.getValues("email"))
                                }
                                disabled={isLoading}
                              >
                                Resend verification code
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {showOTP ? "Verify Code" : "Continue with Email"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* HOD Login */}
              <TabsContent value="hod">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>HOD Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="hod@admin.com"
                                className="pl-10"
                                {...field}
                                disabled={showOTP}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                              disabled={showOTP}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <AnimatePresence mode="wait">
                      {showOTP && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                  <InputOTP
                                    value={field.value}
                                    onChange={field.onChange}
                                    maxLength={6}
                                  >
                                    <InputOTPGroup>
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                      <InputOTPSlot index={3} />
                                      <InputOTPSlot index={4} />
                                      <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="text-center">
                            {resendTimer > 0 ? (
                              <p className="text-muted-foreground text-sm">
                                Resend code in {resendTimer}s
                              </p>
                            ) : (
                              <Button
                                type="button"
                                variant="link"
                                className="h-auto p-0 text-sm"
                                onClick={() =>
                                  handleSendOTP(form.getValues("email"))
                                }
                                disabled={isLoading}
                              >
                                Resend verification code
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {showOTP ? "Verify Code" : "Continue with Email"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* Faculty Login */}
              <TabsContent value="faculty">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Faculty Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="faculty@admin.com"
                                className="pl-10"
                                {...field}
                                disabled={showOTP}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                              disabled={showOTP}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <AnimatePresence mode="wait">
                      {showOTP && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                  <InputOTP
                                    value={field.value}
                                    onChange={field.onChange}
                                    maxLength={6}
                                  >
                                    <InputOTPGroup>
                                      <InputOTPSlot index={0} />
                                      <InputOTPSlot index={1} />
                                      <InputOTPSlot index={2} />
                                      <InputOTPSlot index={3} />
                                      <InputOTPSlot index={4} />
                                      <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                  </InputOTP>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="text-center">
                            {resendTimer > 0 ? (
                              <p className="text-muted-foreground text-sm">
                                Resend code in {resendTimer}s
                              </p>
                            ) : (
                              <Button
                                type="button"
                                variant="link"
                                className="h-auto p-0 text-sm"
                                onClick={() =>
                                  handleSendOTP(form.getValues("email"))
                                }
                                disabled={isLoading}
                              >
                                Resend verification code
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {showOTP ? "Verify Code" : "Continue with Email"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              Forgot your password?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Reset it here
              </a>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              Having trouble?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Contact support
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
