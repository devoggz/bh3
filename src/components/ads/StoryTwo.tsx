"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import { CustomButton } from "../CustomButton";
import ReactPlayer from "react-player";
import CompleteButton from "../CompleteButton";
import { CheckCircle } from "lucide-react";

const StoryTwo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPlaying, setPlaying] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Check if the task was already completed
  useEffect(() => {
    const completed = localStorage.getItem("task_completed");
    if (completed) {
      setTaskCompleted(true);
    }
  }, []);

  const handleCompletion = () => {
    setTaskCompleted(true);
    localStorage.setItem("task_completed", "true");
  };

  const router = useRouter();
  return (
    <div>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          {/* <p className="text-tiny text-white/60 uppercase font-bold">
            Life Ijipe Leo
          </p>
          <h4 className="text-white font-bold text-xl">
            Sema YEA to new begginings
          </h4> */}
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src="https://kenyabankinginsights.co.ke/wp-content/uploads/2024/07/1x-1-2-1024x683.jpeg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          {taskCompleted && (
            <div className="flex flex-row items-center justify-center gap-2 px-2 bg-green-500 text-white p-2 rounded-full">
              <CheckCircle />
              Imemalizika
            </div>
          )}
          <Button
            className="rounded-full bg-bhpink text-white p-4"
            onPress={onOpen}
          >
            Tazama Tangazo 5 points
          </Button>
          <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Story Za Pesa
                  </ModalHeader>
                  <ModalBody>
                    <div className="overflow-hidden rounded-2xl ">
                      <ReactPlayer
                        url="https://www.youtube.com/watch?v=k7qmKXAY0CQ "
                        className="react-player"
                        width="100%"
                        height="100%"
                        onP
                        controls={false}
                        playing={true}
                        onError={(e) =>
                          console.error("Error playing video: ", e)
                        }
                      />
                      {/* <Video src={videoURL} /> */}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className="w-full"
                      color="default"
                      onPress={onClose}
                    >
                      Complete Ad
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StoryTwo;
