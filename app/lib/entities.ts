import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @Column({ type: 'citext', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  emailVerified!: string | null;

  @Column({ type: 'varchar', nullable: true })
  image!: string | null;

  @Column({
    type: 'enum',
    enum: ['client', 'admin', 'partner'],
    default: 'client',
  })
  role!: 'client' | 'admin' | 'partner';

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date;

  @Column({ type: 'boolean', default: false })
  is_active!: boolean;

  @OneToMany(() => SessionEntity, (session) => session.userId)
  sessions!: SessionEntity[];

  @OneToMany(() => AccountEntity, (account) => account.userId)
  accounts!: AccountEntity[];

  @OneToMany(() => ServiceEntity, (service) => service.provider)
  services!: ServiceEntity[];

  @OneToMany(() => BusinessSettingsEntity, (business) => business.admin)
  businesses!: BusinessSettingsEntity[];
}

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'varchar' })
  type!: string;

  @Column({ type: 'varchar' })
  provider!: string;

  @Column({ type: 'varchar' })
  providerAccountId!: string;

  @Column({ type: 'text', nullable: true })
  refresh_token!: string | null;

  @Column({ type: 'text', nullable: true })
  access_token!: string | null;

  @Column({ type: 'bigint', nullable: true })
  expires_at!: number | null;

  @Column({ type: 'varchar', nullable: true })
  token_type!: string | null;

  @Column({ type: 'varchar', nullable: true })
  scope!: string | null;

  @Column({ type: 'text', nullable: true })
  id_token!: string | null;

  @Column({ type: 'varchar', nullable: true })
  session_state!: string | null;

  @Column({ type: 'text', nullable: true })
  oauth_token_secret!: string | null;

  @Column({ type: 'text', nullable: true })
  oauth_token!: string | null;

  @ManyToOne(() => UserEntity, (user) => user.accounts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}

@Entity({ name: 'sessions' })
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  sessionToken!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @Column({ type: 'timestamp with time zone' })
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}

@Entity({ name: 'verification_tokens' })
export class VerificationTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  token!: string;

  @Column({ type: 'varchar' })
  identifier!: string;

  @Column({ type: 'timestamp with time zone' })
  expires!: string;
}

@Entity({ name: 'services' })
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  service_id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url!: string;

  @Column({ type: 'integer' })
  duration_minutes!: number;

  @Column({ type: 'boolean', default: true })
  availability!: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  price!: number;

  @Index('idx_service_category')
  @Column({ type: 'varchar', length: 50, nullable: true })
  category!: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'integer', nullable: true })
  max_capacity!: number;

  @Column({ type: 'integer', nullable: true })
  min_booking_notice_hours!: number;

  @Column({ type: 'text', nullable: true })
  cancellation_policy!: string;

  @Index('idx_service_provider')
  @Column({ type: 'uuid' })
  provider_id!: string;

  @Column({ type: 'text', array: true, nullable: true })
  tags!: string[];

  @Column({ type: 'jsonb', nullable: true })
  name_localized!: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  description_localized!: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  cancellation_policy_localized!: Record<string, any>;

  @ManyToOne(() => UserEntity, (user) => user.services, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'provider_id' })
  provider!: UserEntity;

  @OneToMany(() => BusinessServicesEntity, (bs) => bs.service)
  businessServices!: BusinessServicesEntity[];
}

@Entity({ name: 'business_settings' })
export class BusinessSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('idx_business_name')
  @Column({ type: 'varchar', length: 255 })
  business_name!: string;

  @Column({ type: 'text', nullable: true })
  address!: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone_number!: string;

  @Column({ type: 'jsonb', nullable: true })
  working_hours!: Record<string, any>;

  @Index('idx_business_admin')
  @Column({ type: 'uuid' })
  admin_id!: string;

  @Column({ type: 'uuid', array: true, nullable: true })
  staff_ids!: string[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at!: Date;

  @OneToMany(() => BusinessServicesEntity, (bs) => bs.business)
  businessServices!: BusinessServicesEntity[];

  @ManyToOne(() => UserEntity, (user) => user.businesses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'admin_id' })
  admin!: UserEntity;
}

@Entity({ name: 'business_services' })
@Index('idx_business_services_composite', ['business_id', 'service_id'])
export class BusinessServicesEntity {
  @PrimaryColumn({ type: 'uuid' })
  business_id!: string;

  @PrimaryColumn({ type: 'uuid' })
  service_id!: string;

  @ManyToOne(
    () => BusinessSettingsEntity,
    (business) => business.businessServices,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  @JoinColumn({ name: 'business_id' })
  business!: BusinessSettingsEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.businessServices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service!: ServiceEntity;
}
