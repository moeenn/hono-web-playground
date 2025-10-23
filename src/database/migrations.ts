export class CreateUsersTableMigration {
    name = "create-users-table"

    up = `create table if not exists users (
			id varchar(40)
			, email varchar(100) not null
			, password varchar(255) not null
			, role varchar(20) not null
			, createdAt timestamp not null default current_timestamp
			, deletedAt timestamp
			, primary key (id)
			, constraint userEmailUnique unique (email)
		);
	`

    down = `drop table users`
}
