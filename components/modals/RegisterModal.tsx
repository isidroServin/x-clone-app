"use client";
import { useCallback, useState } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../layout/Input";
import Modal from "../Modal";
import axios from "axios";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToogle = useCallback(() => {
    if (isLoading) return;
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/app/register", {
        email,
        password,
        name,
        username,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, name, username]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
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
      <p>Already have an account?</p>
      <span
        onClick={onToogle}
        className="text-white cursor-pointer hover:underline"
      >
        Sign in
      </span>
    </div>
  );
  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel={"Register"}
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={foooterContent}
      />
    </div>
  );
};

export default RegisterModal;
