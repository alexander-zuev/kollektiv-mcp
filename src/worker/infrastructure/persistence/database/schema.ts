/*
SQLite Schema 101 for Drizzle ORM

DATA TYPES:
- text() - UTF-8/UTF-16 strings, unlimited length
- integer() - 0-8 byte integers, modes: number, boolean, timestamp, timestamp_ms
- real() - 8-byte IEEE floating point
- blob() - Raw binary data
- Mode options: { mode: 'json' } for JSON data, { mode: 'timestamp' } for dates

CONSTRAINTS:
- .primaryKey() - Primary key constraint
- .notNull() - Prevents null values
- .unique() - Unique constraint
- .default(value) - Static default value
- .$defaultFn(() => value) - Runtime default generation
- .$onUpdateFn(() => value) - Auto-update on modifications
- .$type<CustomType>() - Custom TypeScript typing

RELATIONSHIPS:
- foreignKey() - Foreign key relationships
- references() - Column-level foreign key reference
- No built-in cascade options (SQLite limitation)

INDEXES:
- index('name').on(column) - Standard index
- uniqueIndex('name').on(column) - Unique index
- Composite indexes: .on(col1, col2)
- Partial indexes: .where(condition)

SQLITE LIMITATIONS:
- No RLS (Row Level Security) - use application-level auth
- No schemas - all tables in single namespace
- No views in Drizzle SQLite (use queries instead)
- No materialized views
- Limited ALTER TABLE support
- No CHECK constraints in Drizzle SQLite
*/

import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const workspaceInstallations = sqliteTable(
  'workspace_installations',
  {
    teamId: text('team_id').primaryKey(),
    teamName: text('team_name').notNull(),
    slackAccessToken: text('slack_access_token').notNull(),
    botUserId: text('bot_user_id').notNull(),
    appId: text('app_id').notNull(),
    scopes: text('scopes', { mode: 'json' }).notNull().$type<string[]>(),
    enterpriseId: text('enterprise_id'),
    enterpriseName: text('enterprise_name'),
    authedUserId: text('authed_user_id'),
    authedUserToken: text('authed_user_token'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  table => ({
    // Index for enterprise lookups if needed later
    enterpriseIdx: index('workspace_installations_enterprise_idx').on(table.enterpriseId),
    // Index for timestamp-based queries
    createdAtIdx: index('workspace_installations_created_at_idx').on(table.createdAt),
  })
);

export const waitlistSignups = sqliteTable('waitlist_signups', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});