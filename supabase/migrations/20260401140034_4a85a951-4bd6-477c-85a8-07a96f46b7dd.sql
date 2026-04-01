
CREATE TABLE public.bank_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_holder_name TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  ifsc_code TEXT NOT NULL,
  account_type TEXT NOT NULL DEFAULT 'savings',
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bank_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bank details"
  ON public.bank_details FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bank details"
  ON public.bank_details FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bank details"
  ON public.bank_details FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bank details"
  ON public.bank_details FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
