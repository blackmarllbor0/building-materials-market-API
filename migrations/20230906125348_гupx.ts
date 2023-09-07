import { Knex } from 'knex';

const tables = {
  user: 'user',
  session: 'session',
  authAudit: 'auth_audit',
  authAuditEvent: 'auth_audit_event',
  userStatus: 'user_status',
  userRole: 'user_role',
  orderPaymentType: 'order_payment_type',
  orderStatus: 'order_status',
  order: 'order',
  delivery: 'delivery',
  orderHistory: 'order_history',
  manufacturingCompany: 'manufacturing_company',
  category: 'category',
  product: 'product',
  feedback: 'feedback',
  orderDetail: 'order_detail',
};

const CASCADE = 'CASCADE';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTableIfNotExists(tables.user, (table: Knex.TableBuilder) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone_number').notNullable().unique();
      table.string('password_hash').notNullable().unique();
      table.string('role').defaultTo('customer');
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.session, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable(tables.user)
        .onDelete(CASCADE);

      table.string('token').unique().notNullable();
      table.timestamp('live_time').notNullable();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.authAudit, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable(tables.user)
        .onDelete(CASCADE);

      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(
      tables.authAuditEvent,
      (table: Knex.TableBuilder) => {
        table.increments('id');
        table
          .integer('auth_audit_id')
          .notNullable()
          .references('id')
          .inTable(tables.authAudit)
          .onDelete(CASCADE);

        table.string('name').notNullable().unique();
        table.timestamp('create_date').defaultTo(knex.fn.now());
        table.timestamp('update_date');
        table.timestamp('delete_date');
      },
    )
    .createTableIfNotExists(tables.userStatus, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable(tables.user)
        .onDelete(CASCADE);
      table.string('name').notNullable().unique();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.userRole, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable(tables.user)
        .onDelete(CASCADE);
      table.string('name').notNullable().unique();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(
      tables.orderPaymentType,
      (table: Knex.TableBuilder) => {
        table.increments('id');
        table.string('name').notNullable().unique();
        table.timestamp('create_date').defaultTo(knex.fn.now());
        table.timestamp('update_date');
        table.timestamp('delete_date');
      },
    )
    .createTableIfNotExists(tables.orderStatus, (table: Knex.TableBuilder) => {
      table.increments('id');
      table.integer('code').notNullable().unique();
      table.string('name').notNullable().unique();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.order, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable(tables.user)
        .onDelete(CASCADE);
      table
        .integer('order_status_id')
        .notNullable()
        .references('id')
        .inTable(tables.orderStatus)
        .onDelete(CASCADE);
      table
        .integer('order_payment_type_id')
        .notNullable()
        .references('id')
        .inTable(tables.orderPaymentType)
        .onDelete(CASCADE);
      table.integer('number').notNullable().unique();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.delivery, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('order_id')
        .notNullable()
        .references('id')
        .inTable(tables.order)
        .onDelete(CASCADE);
      table.decimal('amount').notNullable();
      table.string('address_from').notNullable();
      table.string('address_to').notNullable();
      table.timestamp('approximate_date').notNullable();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.orderHistory, (table: Knex.TableBuilder) => {
      table
        .integer('order_status_id')
        .notNullable()
        .references('id')
        .inTable(tables.orderStatus)
        .onDelete(CASCADE);
      table
        .integer('order_id')
        .notNullable()
        .references('id')
        .inTable(tables.order)
        .onDelete(CASCADE);
      table.integer('total_quantity').notNullable();
      table.decimal('total_cost').notNullable();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(
      tables.manufacturingCompany,
      (table: Knex.TableBuilder) => {
        table.increments('id');
        table.string('name').notNullable().unique();
        table.string('link_to_website').notNullable().unique();
        table.string('phone_number').notNullable().unique();
        table.string('link_to_logo_image').notNullable().unique();
        table.string('email').notNullable().unique();
        table.text('description').notNullable();
        table.timestamp('create_date').defaultTo(knex.fn.now());
        table.timestamp('update_date');
        table.timestamp('delete_date');
      },
    )
    .createTableIfNotExists(tables.category, (table: Knex.TableBuilder) => {
      table.increments('id');
      table.string('name').notNullable().unique();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.product, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('company_id')
        .notNullable()
        .references('id')
        .inTable(tables.manufacturingCompany)
        .onDelete(CASCADE);
      table
        .integer('category_id')
        .notNullable()
        .references('id')
        .inTable(tables.category)
        .onDelete(CASCADE);
      table.integer('quantity').notNullable();
      table.decimal('price').notNullable();
      table.decimal('rating').notNullable().defaultTo(5);
      table.string('link_to_images').notNullable().unique();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.feedback, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable(tables.user)
        .onDelete(CASCADE);
      table
        .integer('product_id')
        .notNullable()
        .references('id')
        .inTable(tables.product)
        .onDelete(CASCADE);
      table
        .integer('company_id')
        .notNullable()
        .references('id')
        .inTable(tables.manufacturingCompany)
        .onDelete(CASCADE);
      table.decimal('rating').notNullable().defaultTo(5);
      table.string('title').notNullable();
      table.text('message').notNullable();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    })
    .createTableIfNotExists(tables.orderDetail, (table: Knex.TableBuilder) => {
      table.increments('id');
      table
        .integer('order_id')
        .notNullable()
        .references('id')
        .inTable(tables.order)
        .onDelete(CASCADE);
      table
        .integer('product_id')
        .notNullable()
        .references('id')
        .inTable(tables.product)
        .onDelete(CASCADE);
      table.integer('quantity').notNullable();
      table.timestamp('create_date').defaultTo(knex.fn.now());
      table.timestamp('update_date');
      table.timestamp('delete_date');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(tables.authAuditEvent)
    .dropTableIfExists(tables.authAudit)
    .dropTableIfExists(tables.session)
    .dropTableIfExists(tables.userStatus)
    .dropTableIfExists(tables.userRole)
    .dropTableIfExists(tables.delivery)
    .dropTableIfExists(tables.orderHistory)
    .dropTableIfExists(tables.orderDetail)
    .dropTableIfExists(tables.order)
    .dropTableIfExists(tables.orderPaymentType)
    .dropTableIfExists(tables.feedback)
    .dropTableIfExists(tables.product)
    .dropTableIfExists(tables.manufacturingCompany)
    .dropTableIfExists(tables.category)
    .dropTableIfExists(tables.orderStatus)
    .dropTableIfExists(tables.user);
}
