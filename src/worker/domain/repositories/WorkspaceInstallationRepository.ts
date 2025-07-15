import type { WorkspaceInstallation } from '@/domain/models';

export interface WorkspaceInstallationRepository {
  save(installation: WorkspaceInstallation): Promise<WorkspaceInstallation>;

  findByTeamId(teamId: string): Promise<WorkspaceInstallation | null>;

  delete(teamId: string): Promise<void>;

  exists(teamId: string): Promise<boolean>;
}