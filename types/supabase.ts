export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: 'user' | 'editor' | 'admin' | 'super_admin';
          preferred_language: string;
          preferred_theme: string;
          created_at: string;
          updated_at: string;
        };
      };
      locations: {
        Row: {
          id: string;
          slug: string | null;
          name_tr: string;
          name_en: string | null;
          city: string;
          region_id: string | null;
          category_id: string | null;
          description_tr: string | null;
          description_en: string | null;
          latitude: number | null;
          longitude: number | null;
          images: string[];
          cover_image: string | null;
          rating: number;
          visit_count: number;
          approval_status: 'pending' | 'approved' | 'rejected';
        };
      };
      // Diğer tablolar (regions, categories, favorites) ilerledikçe eklenecek
    };
  };
}