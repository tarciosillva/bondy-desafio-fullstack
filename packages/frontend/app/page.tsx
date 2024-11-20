"use client";

import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import client from "./api/graphql";
import Image from "next/image";
import useUserStore from "./context/login";
import Input from "./components/input";
import { useRouter } from 'next/navigation'

const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      company
      _id
      email
      name
    }
  }
`;

function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const { setUser } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ variables: { email, password } });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (data && data.login) {
      setUser(data.login);
      router.push("/welcome");
    }
  }, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-3/12 bg-white border border-gray-300 rounded-md p-7 grid gap-4"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src={"/logo-bondy.png"}
            width={120}
            height={40}
            alt="bondy-logo"
            priority
          />
          <p className="text-gray-500">
            Insira suas credenciais para acessar sua conta
          </p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-gray-700 font-medium text-sm">
            Email
          </label>
          <Input
            inputProps={{
              id: "email",
              type: "email",
              placeholder: "Insira seu email",
              value: email,
            }}
            setState={setEmail}
          />
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="password"
            className="text-gray-700 font-medium text-sm"
          >
            Senha
          </label>
          <Input
            inputProps={{
              id: "password",
              type: "password",
              placeholder: "Insira sua senha",
              value: password,
            }}
            setState={setPassword}
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-[#4040FF] hover:bg-[#3333CC] p-2 rounded-md"
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
        {error && <p className="text-center text-red-600">{error.message}</p>}
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <LoginForm />
    </ApolloProvider>
  );
}
