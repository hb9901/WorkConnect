import { createClient } from "@/utils/supabase/supabaseServer";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const { data, error } = await supabase
      .from("todo")
      .select()
      .eq("user_id", userId!)
      .order("start_date", { ascending: true });
    if (error)
      return NextResponse.json({
        message: "Failed to fetch supabase data",
        error,
        status: false,
        statusCode: 500,
      });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch data",
      error,
      status: false,
      statusCode: 500,
    });
  }
};
