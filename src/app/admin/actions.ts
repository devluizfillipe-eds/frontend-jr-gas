"use server";

export async function authenticateAdmin(user: string, pass: string) {
  return (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASSWORD
  );
}
