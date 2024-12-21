import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserEntity } from '@/app/lib/entities'; // Assuming UserEntity is in a separate file

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column('uuid')
  partnerId!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('int')
  duration!: number; // in minutes

  @Column('simple-array', { nullable: true })
  images!: string[];

  @Column('boolean', { default: false })
  isHomeService!: boolean;

  @Column('boolean', { default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // @ManyToOne(() => UserEntity, (user) => user.services)
  // partner!: UserEntity;

  @OneToMany(
    () => ServiceTranslationEntity,
    (translation) => translation.service,
    {
      cascade: true,
    }
  )
  translations!: ServiceTranslationEntity[];
}

@Entity('service_translations')
@Index(['serviceId', 'languageCode'], { unique: true })
export class ServiceTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  serviceId!: string;

  @Column('varchar', { length: 5 })
  languageCode!: string;

  @Column('varchar', { length: 100 })
  title!: string;

  @Column('text')
  description!: string;

  @ManyToOne(() => ServiceEntity, (service) => service.translations, {
    onDelete: 'CASCADE',
  })
  service!: ServiceEntity;
}
