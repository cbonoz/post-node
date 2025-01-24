import { supabase } from '../supabase';

// Middleware for authentication
export const authenticate = async (request: any, reply: any) => {
  const token = request.headers['authorization']?.replace('Bearer ', '');
  if (!token) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
  }

  const { data: user, error } = await supabase.auth.getUser(token);
  if (error || !user) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
  }

  request.user = user;
};
