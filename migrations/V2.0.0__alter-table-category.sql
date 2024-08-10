-- Drop Foreign Key Constraint
ALTER TABLE "products" DROP CONSTRAINT "products_productCategoryProductCategoryId_fkey";

-- Drop product_categories Table
DROP TABLE "product_categories";

-- Alter products Table to Add category Column
ALTER TABLE "products" 
ADD COLUMN "category" TEXT NOT NULL 
CHECK ("category" IN ('Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'));

-- Update products Table to Remove productCategoryProductCategoryId Column
ALTER TABLE "products" DROP COLUMN "productCategoryProductCategoryId";
