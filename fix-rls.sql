-- Fix infinite recursion by using auth.jwt() instead of querying profiles table

-- Drop all broken policies on service_providers
DROP POLICY IF EXISTS "Admin all service_providers" ON service_providers;
DROP POLICY IF EXISTS "Admin read all providers" ON service_providers;
DROP POLICY IF EXISTS "Admin update providers" ON service_providers;
DROP POLICY IF EXISTS "Admin delete providers" ON service_providers;

-- Drop broken policies on support_messages
DROP POLICY IF EXISTS "Admin read all messages" ON support_messages;
DROP POLICY IF EXISTS "Admin send replies" ON support_messages;
DROP POLICY IF EXISTS "Admin update read status" ON support_messages;

-- Drop broken policies on products
DROP POLICY IF EXISTS "Admin all products" ON products;

-- Recreate service_providers policies WITHOUT querying profiles
CREATE POLICY "Public read approved providers" ON service_providers FOR SELECT USING (status = 'approved');
CREATE POLICY "Anyone can apply" ON service_providers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read all providers" ON service_providers FOR SELECT USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
CREATE POLICY "Admin update providers" ON service_providers FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
CREATE POLICY "Admin delete providers" ON service_providers FOR DELETE USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Recreate support_messages admin policies
CREATE POLICY "Admin read all messages" ON support_messages FOR SELECT USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
CREATE POLICY "Admin send replies" ON support_messages FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
CREATE POLICY "Admin update read status" ON support_messages FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin' OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
