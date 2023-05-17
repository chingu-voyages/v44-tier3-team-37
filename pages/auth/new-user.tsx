import { useState } from "react";
import Router from "next/router";

export default function NewUser() {
  const [isOrg, setIsOrg] = useState(false);

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { isOrg };
      await fetch(`/api/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Welcome to Image Vault!</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="role">Are you an organization?</label>
        <input
          id="role"
          onChange={() => setIsOrg(!isOrg)}
          checked={isOrg}
          type="checkbox"
        />
        <button>Submit</button>
      </form>
    </>
  );
}
