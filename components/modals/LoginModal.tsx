"use client";
import { useCallback, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../layout/Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToogle = useCallback(() => {
    if (isLoading) return;
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );
  const foooterContent = (
    <div className="text-neutral-100 text-center mt-4">
      <p>Dont have an account?</p>
      <span
        onClick={onToogle}
        className="text-white cursor-pointer hover:underline"
      >
        Create an account
      </span>
    </div>
  );
  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel={"Sign in"}
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={foooterContent}
      />
    </div>
  );
};

export default LoginModal;
