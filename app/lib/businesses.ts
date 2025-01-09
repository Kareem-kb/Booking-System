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
import { UserEntity } from '@/app/lib/entities'; // Assuming UserEntity is in a separate file

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


  @Column({ type: 'integer', nullable: true })
  max_capacity!: number;

  @Column({ type: 'integer', nullable: true })
  min_booking_notice_hours!: number;



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
