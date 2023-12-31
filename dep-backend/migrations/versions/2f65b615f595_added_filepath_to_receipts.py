"""added filepath to receipts

Revision ID: 2f65b615f595
Revises: 18e3df8ab0fb
Create Date: 2023-05-07 07:04:26.802290

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2f65b615f595'
down_revision = '18e3df8ab0fb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('receipts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('filePath', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('receipts', schema=None) as batch_op:
        batch_op.drop_column('filePath')

    # ### end Alembic commands ###
