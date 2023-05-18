"use client";

import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signUp } from "@/app/services/user";
import { UserSignUp } from "@/app/models/User";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true);
    const body = { ...(data as UserSignUp) };
    try {
      const resp = await signUp(body);
      toast.success("Account created successfully!");
      registerModal.onClose();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const footerContent = (
    <div className="flex flex-col gap-4 mt-2">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer font-semibold hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Sheol Shop" subtitle="Create an account" />
      <Input register={register} id="username" label="Username" disabled={isLoading} errors={errors} required />
      <Input register={register} id="email" type="email" label="Email" disabled={isLoading} errors={errors} required />
      <Input register={register} id="name" label="Name" disabled={isLoading} errors={errors} required />
      <Input
        register={register}
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
