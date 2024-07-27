export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      channel: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          type: string | null;
          workspace_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          type?: string | null;
          workspace_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          type?: string | null;
          workspace_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'channel_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspace';
            referencedColumns: ['id'];
          }
        ];
      };
      channel_user: {
        Row: {
          channel_id: number;
          created_at: string;
          id: number;
          last_read_chat_id: number | null;
          user_id: string | null;
          workspace_user_id: string;
        };
        Insert: {
          channel_id: number;
          created_at?: string;
          id?: number;
          last_read_chat_id?: number | null;
          user_id?: string | null;
          workspace_user_id: string;
        };
        Update: {
          channel_id?: number;
          created_at?: string;
          id?: number;
          last_read_chat_id?: number | null;
          user_id?: string | null;
          workspace_user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'channel_user_workspace_user_id_fkey';
            columns: ['workspace_user_id'];
            isOneToOne: false;
            referencedRelation: 'workspace_user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'room_user_room_id_fkey';
            columns: ['channel_id'];
            isOneToOne: false;
            referencedRelation: 'channel';
            referencedColumns: ['id'];
          }
        ];
      };
      chat: {
        Row: {
          channel_id: number;
          content: string;
          created_at: string;
          id: number;
          is_notice: boolean;
          type: string;
          workspace_user_id: string;
        };
        Insert: {
          channel_id: number;
          content: string;
          created_at?: string;
          id?: number;
          is_notice: boolean;
          type: string;
          workspace_user_id: string;
        };
        Update: {
          channel_id?: number;
          content?: string;
          created_at?: string;
          id?: number;
          is_notice?: boolean;
          type?: string;
          workspace_user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_room_id_fkey';
            columns: ['channel_id'];
            isOneToOne: false;
            referencedRelation: 'channel';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_workspace_user_id_fkey';
            columns: ['workspace_user_id'];
            isOneToOne: false;
            referencedRelation: 'workspace_user';
            referencedColumns: ['id'];
          }
        ];
      };
      file: {
        Row: {
          chat_id: number;
          created_at: string;
          id: number;
          type: string;
          url: string;
        };
        Insert: {
          chat_id: number;
          created_at?: string;
          id?: number;
          type: string;
          url: string;
        };
        Update: {
          chat_id?: number;
          created_at?: string;
          id?: number;
          type?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'file_chat_id_fkey';
            columns: ['chat_id'];
            isOneToOne: false;
            referencedRelation: 'chat';
            referencedColumns: ['id'];
          }
        ];
      };
      todo: {
        Row: {
          end_date: string;
          id: string;
          place: string | null;
          priority: string;
          start_date: string;
          status: string;
          title: string;
          user_id: string;
        };
        Insert: {
          end_date: string;
          id?: string;
          place?: string | null;
          priority: string;
          start_date: string;
          status: string;
          title: string;
          user_id: string;
        };
        Update: {
          end_date?: string;
          id?: string;
          place?: string | null;
          priority?: string;
          start_date?: string;
          status?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'todo2_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'workspace_user';
            referencedColumns: ['id'];
          }
        ];
      };
      user: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          sns_type: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          sns_type?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          sns_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      workspace: {
        Row: {
          admin_user_id: string | null;
          created_at: string;
          id: number;
          invite_code: number | null;
          name: string;
        };
        Insert: {
          admin_user_id?: string | null;
          created_at?: string;
          id?: number;
          invite_code?: number | null;
          name: string;
        };
        Update: {
          admin_user_id?: string | null;
          created_at?: string;
          id?: number;
          invite_code?: number | null;
          name?: string;
        };
        Relationships: [];
      };
      workspace_user: {
        Row: {
          email: string | null;
          id: string;
          name: string | null;
          phone: string | null;
          profile_image: string | null;
          state: string | null;
          user_id: string;
          workspace_id: number | null;
        };
        Insert: {
          email?: string | null;
          id?: string;
          name?: string | null;
          phone?: string | null;
          profile_image?: string | null;
          state?: string | null;
          user_id: string;
          workspace_id?: number | null;
        };
        Update: {
          email?: string | null;
          id?: string;
          name?: string | null;
          phone?: string | null;
          profile_image?: string | null;
          state?: string | null;
          user_id?: string;
          workspace_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'workspace_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'workspace_user_workspace_id_fkey';
            columns: ['workspace_id'];
            isOneToOne: false;
            referencedRelation: 'workspace';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_chat_channels: {
        Args: {
          wid: number;
          wuid: string;
        };
        Returns: {
          channel_id: number;
          channel_name: string;
          message_created_at: string;
          message: string;
          is_dm: boolean;
          user_name: string;
          user_state: string;
          user_thumbnail: string;
          workspace_user_id: string;
          user_count: number;
        }[];
      };
      get_chat_messages: {
        Args: {
          cid: number;
        };
        Returns: {
          id: number;
          created_at: string;
          content: string;
          type: string;
          is_notice: boolean;
          workspace_user_id: string;
          name: string;
          profile_image: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
