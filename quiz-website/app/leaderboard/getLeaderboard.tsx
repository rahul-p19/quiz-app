'use server'
import { db as prisma } from "@/prisma/client";
import { unstable_cache } from "next/cache";

export default async function getLeaderboard() {
  const getCachedLeaderboard = unstable_cache(async () => {
    const leaderboard = await prisma.user.findMany({
      where: {
        role: "USER"
      },
      select: {
        name: true,
        year: true,
        department: true,
        score: true,
      },
      orderBy: {
        score: "desc",
      },
    });

    return leaderboard;
  }, [], {
    revalidate: 60
  });

  return getCachedLeaderboard();
}
