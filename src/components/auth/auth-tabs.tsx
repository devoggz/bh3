"use client";

import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";
import { useRouter } from "next/navigation";

export default function AuthTabs() {
  const [selected, setSelected] = React.useState<string>("login");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="max-w-full w-[420px] py-2 mb-4 pt-2 ">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            variant="bordered"
            color="primary"
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key.toString())}
          >
            <Tab key="login" title="Login">
              <div className="mt-4 ">
                <SignInForm />
              </div>
              <div className=" mb-2">
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
              </div>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <div className="">
                <SignUpForm />
              </div>

              <div className="flex gap-2 justify-end">
                {/* <Button
                  type="submit"
                  fullWidth
                  className="mb-6 mt-4 text-white font-medium rounded-lg  bg-gradient-to-r    
            from-indigo-400 from-10% via-sky-400 via-30% to-emerald-400 to-90% 
            animate-appearance-in"
                >
                  Create Account
                </Button> */}
              </div>
              <p className="text-center mt-4 text-small">
                Already have an account?{" "}
                <Link size="sm" onPress={() => setSelected("login")}>
                  Login
                </Link>
              </p>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
