import { Article } from "src/articles/entities/article.entity";
import { Follow } from "src/follow/entities/follow.entity";
import { Like } from "src/like/entities/like.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nickname: string;

    @Column({ nullable: true, default: null })
    password: string;

    @Column({ default: '' })
    status_message: string;

    @Column({ default: '' })
    profile_image: string;

    @Column({ default: 0 })
    total_following: number;

    @Column({ default: 0 })
    total_follower: number;

    @Column()
    login_method: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @OneToMany(() => Article, (Article) => Article.user_id, { cascade: true })
    @JoinColumn()
    article?: Article[];

    @OneToMany(() => Follow, (Follow) => Follow.follower_id, { cascade: true })
    @JoinColumn()
    follower?: Follow[];

    @OneToMany(() => Follow, (Follow) => Follow.following_id, { cascade: true })
    @JoinColumn()
    following?: Follow[];

    @OneToMany(() => Like, (Like) => Like.user_id, { cascade: true })
    @JoinColumn()
    likes: Like[];
}