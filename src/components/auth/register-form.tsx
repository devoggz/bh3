"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { registerSchema } from "@/schemas";
import { register } from "../../../actions/register";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "@/hooks/useLocation";

import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import TermsConditions from "@/app/(share layout)/terms/page";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { countiesData } from "@/data/countyData";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const RegisterForm = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true); // Button initially disabled
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  // Scroll event handler
  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setIsDisabled(false); // Enable button when user scrolls to the bottom
      }
    }
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollArea) {
        scrollArea.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      county: "",
      subCounty: "",
      ward: "",
      phoneNumber: "",
      password: "",
      username: "",
      idNumber: "",
      bikeNumber: "",
      riderType: "",
      terms: false,
      stage: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError(""), setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          router.push("/login");
        }
      });
    });
  };

  // BIKE FIRST, TUSHIRIKIANE, T

  const {
    selectedCounty,
    selectedSubCounty,
    selectedWard,
    handleCountyChange,
    handleSubCountyChange,
    handleWardChange,
  } = useLocation(countiesData);

  return (
    <div className="container mb-6 mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jina</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="John Doe"
                      {...field}
                    />
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nambari ya Simu </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="07000123456"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nambari ya Kipande</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="12345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* MAKE IT UPPERCASE */}
            <FormField
              control={form.control}
              name="bikeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nambari ya PikiPiki</FormLabel>

                  <FormControl>
                    <Input
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                      value={field.value?.toUpperCase() || ""}
                      disabled={isPending}
                      placeholder="KMWT1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center justify-between">
            {/* County Selector */}
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua County Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCountyChange(value); // Update subcounty options based on selected county
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select County" />
                      </SelectTrigger>
                      <SelectContent>
                        {countiesData.map((county) => (
                          <SelectItem
                            key={county.county_code}
                            value={county.county_name}
                          >
                            {county.county_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SubCounty Selector */}
            <FormField
              control={form.control}
              name="subCounty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Sub County Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleSubCountyChange(value); // Update ward options based on selected subcounty
                      }}
                      defaultValue={field.value}
                      disabled={!selectedCounty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select SubCounty" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCounty?.sub_counties.map((subCounty) => (
                          <SelectItem
                            key={subCounty.subcounty_name}
                            value={subCounty.subcounty_name}
                          >
                            {subCounty.subcounty_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ward Selector */}
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Ward Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleWardChange(value); // Update stage options based on selected ward
                      }}
                      defaultValue={field.value}
                      disabled={!selectedSubCounty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedSubCounty?.wards.map((ward) => (
                          <SelectItem
                            key={ward.ward_name}
                            value={ward.ward_name}
                          >
                            {ward.ward_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stage Selector */}
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Stage Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedWard}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedWard?.stages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="riderType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>(Mwenye pikipiki/ Rider/ Mechanic)</FormLabel>
                <FormDescription>
                  Unaweza kuchagua zaidi ya jibu moja hapa bora majibu yawe
                  kweli
                </FormDescription>
                <FormControl>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chagua" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <Separator className="mt-2 mb-2" />
                        <SelectItem value="Owner">Mwenye pikipiki</SelectItem>

                        <SelectItem value="Rider">Rider</SelectItem>
                        <SelectItem value="Mechanic">Mechanic</SelectItem>
                        <Separator className="mt-2 mb-2" />
                        <SelectLabel>Wewe ni chairman?</SelectLabel>
                        <Separator className="mt-2 mb-2" />
                        <SelectItem value="COUNTY_CHAIRMAN">
                          County Chairman
                        </SelectItem>
                        <SelectItem value="SUB_COUNTY_CHAIRMAN">
                          Sub County Chairman
                        </SelectItem>
                        <SelectItem value="WARD_CHAIRMAN">
                          Ward Chairman
                        </SelectItem>
                        <SelectItem value="STAGE_CHAIRMAN">
                          Stage Chairman
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-1 space-y-0 rounded-md border p-2 shadow">
                <FormControl></FormControl>
                <div className="space-y-1 leading-none">
                  <FormDescription>
                    <Drawer>
                      <DrawerTrigger>
                        <p className="text-left text-sm">
                          Soma{" "}
                          <Link className="font-bold" href="/privacy">
                            Privacy Policy.{""}
                          </Link>
                          Bonyeza Kubali na Ueendelee kama umekubali{" "}
                          <span className="font-bold">
                            Terms and Conditions
                          </span>
                        </p>
                      </DrawerTrigger>
                      <DrawerContent>
                        {/* Scrollable area for terms and conditions */}
                        <ScrollArea
                          className="h-[600px] rounded-md border p-4"
                          ref={scrollAreaRef}
                        >
                          <TermsConditions />
                        </ScrollArea>
                        <DrawerFooter>
                          <DrawerClose>
                            <Button
                              onClick={() => setIsDisabled(false)}
                              variant="outline"
                              className="w-full"
                              disabled={isDisabled} // Disable the button initially
                            >
                              Kubali na Ueendelee
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormSuccess message={success} />

          <FormError message={error} />

          <div className="mt-12">
            <Button
              disabled={isPending}
              className="w-full bg-bhgreen  mt-2 mb-2 text-white h-12 font-medium rounded-lg  
            "
            >
              Tengeneza Akaunti Yangu
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
