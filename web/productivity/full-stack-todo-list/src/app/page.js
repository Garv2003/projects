"use client";
import { useGetTodo } from "@/hook/hook";
import Form from "@/components/Form";
import Header from "@/components/Header";
import TODOHero from "@/components/TODOHero";
import TODOList from "@/components/TODOList";

function Home() {
  const { data: todos, isLoading, error } = useGetTodo();

  return (
    <div className="wrapper">
      <Header />
      {isLoading ? (
        <p className="text_large text_center">Loading...</p>
      ) : error ? (
        <p className="text_large text_center">Error: {error.message}</p>
      ) : (
        <>
          <TODOHero todos={todos} total_todos={todos?.length} />
          <Form />
          <TODOList todos={todos} />
        </>
      )}
    </div>
  );
}

export default Home;
