interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export async function createUser(user: CreateUserParams) {
  if (typeof window !== "undefined") {
    // Client-side: Fetch a server endpoint (we’ll assume the page handles it)
    const response = await fetch(window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createUser", ...user }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to create user");
    return result;
  } else {
    // Server-side
    const { ID, Query } = await import("node-appwrite");
    const { users } = await import("../appwrite.config");

    try {
      const newUser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      );
      return newUser;
    } catch (error: any) {
      if (error?.code === 409) {
        const documents = await users.list([
          Query.equal("email", [user.email]),
        ]);
        return documents?.users[0];
      }
      throw error;
    }
  }
}
