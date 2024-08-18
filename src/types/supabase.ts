export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      channel: {
        Row: {
          created_at: string
          host_id: string | null
          id: number
          name: string | null
          thumbnail: string | null
          type: string | null
          workspace_id: number
        }
        Insert: {
          created_at?: string
          host_id?: string | null
          id?: number
          name?: string | null
          thumbnail?: string | null
          type?: string | null
          workspace_id: number
        }
        Update: {
          created_at?: string
          host_id?: string | null
          id?: number
          name?: string | null
          thumbnail?: string | null
          type?: string | null
          workspace_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "channel_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_user: {
        Row: {
          channel_id: number
          created_at: string
          id: number
          last_active_at: string | null
          workspace_user_id: string
        }
        Insert: {
          channel_id: number
          created_at?: string
          id?: number
          last_active_at?: string | null
          workspace_user_id: string
        }
        Update: {
          channel_id?: number
          created_at?: string
          id?: number
          last_active_at?: string | null
          workspace_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_user_workspace_user_id_fkey"
            columns: ["workspace_user_id"]
            isOneToOne: false
            referencedRelation: "workspace_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_user_room_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channel"
            referencedColumns: ["id"]
          },
        ]
      }
      chat: {
        Row: {
          channel_id: number
          content: string
          created_at: string
          id: number
          type: string
          workspace_user_id: string | null
        }
        Insert: {
          channel_id: number
          content: string
          created_at?: string
          id?: number
          type: string
          workspace_user_id?: string | null
        }
        Update: {
          channel_id?: number
          content?: string
          created_at?: string
          id?: number
          type?: string
          workspace_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_workspace_user_id_fkey"
            columns: ["workspace_user_id"]
            isOneToOne: false
            referencedRelation: "workspace_user"
            referencedColumns: ["id"]
          },
        ]
      }
      todo: {
        Row: {
          end_date: string
          id: string
          place: string | null
          priority: string | null
          start_date: string
          status: string
          title: string
          workspace_user_id: string
        }
        Insert: {
          end_date: string
          id?: string
          place?: string | null
          priority?: string | null
          start_date: string
          status: string
          title: string
          workspace_user_id: string
        }
        Update: {
          end_date?: string
          id?: string
          place?: string | null
          priority?: string | null
          start_date?: string
          status?: string
          title?: string
          workspace_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todo_workspace_user_id_fkey"
            columns: ["workspace_user_id"]
            isOneToOne: false
            referencedRelation: "workspace_user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace: {
        Row: {
          admin_user_id: string | null
          created_at: string
          id: number
          invite_code: number
          name: string
          notice_channel_id: number | null
        }
        Insert: {
          admin_user_id?: string | null
          created_at?: string
          id?: number
          invite_code: number
          name: string
          notice_channel_id?: number | null
        }
        Update: {
          admin_user_id?: string | null
          created_at?: string
          id?: number
          invite_code?: number
          name?: string
          notice_channel_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "workspace_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_notice_channel_id_fkey"
            columns: ["notice_channel_id"]
            isOneToOne: false
            referencedRelation: "channel"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_user: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_open: boolean
          name: string
          phone: string | null
          profile_image: string | null
          state: string | null
          user_id: string
          workspace_id: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          is_open?: boolean
          name: string
          phone?: string | null
          profile_image?: string | null
          state?: string | null
          user_id: string
          workspace_id?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_open?: boolean
          name?: string
          phone?: string | null
          profile_image?: string | null
          state?: string | null
          user_id?: string
          workspace_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workspace_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_user_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspace"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_channel_name: {
        Args: {
          cid: number
          wuid: string
        }
        Returns: string
      }
      get_channels: {
        Args: {
          wid: number
          wuid: string
        }
        Returns: {
          channel_id: number
          message_created_at: string
          message: string
          is_dm: boolean
          user_state: string
          channel_thumbnail: string
          workspace_user_id: string
          user_count: number
          type: string
          channel_name: string
          created_at: string
          un_read_chat: number
        }[]
      }
      get_chat_channel_id: {
        Args: {
          wid: number
          wuid: string
        }
        Returns: number
      }
      get_chat_messages: {
        Args: {
          cid: number
        }
        Returns: {
          id: number
          created_at: string
          content: string
          type: string
          workspace_user_id: string
        }[]
      }
      get_existing_channel_id: {
        Args: {
          my_wuid: string
          other_wuid: string
        }
        Returns: number
      }
      get_users_in_channel: {
        Args: {
          cid: number
        }
        Returns: {
          name: string
          profile_image: string
          workspace_user_id: string
          last_active_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
