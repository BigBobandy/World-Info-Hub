-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "alpha2Code" TEXT NOT NULL,
    "alpha3Code" TEXT NOT NULL,
    "altSpellings" TEXT[],
    "area" DOUBLE PRECISION,
    "borders" TEXT[],
    "capital" TEXT,
    "cioc" TEXT,
    "continents" TEXT[],
    "demonym" TEXT,
    "flag" TEXT,
    "gini" DOUBLE PRECISION,
    "latlng" DOUBLE PRECISION[],
    "name" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL,
    "numericCode" TEXT,
    "population" BIGINT NOT NULL,
    "region" TEXT NOT NULL,
    "subregion" TEXT,
    "timezones" TEXT[],
    "unMember" BOOLEAN,
    "gdp" DOUBLE PRECISION,
    "gdpDate" TIMESTAMP(3),
    "incomeLevel" TEXT,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CountryToCurrency" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_alpha2Code_key" ON "Country"("alpha2Code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_alpha3Code_key" ON "Country"("alpha3Code");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToCurrency_AB_unique" ON "_CountryToCurrency"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToCurrency_B_index" ON "_CountryToCurrency"("B");

-- AddForeignKey
ALTER TABLE "_CountryToCurrency" ADD CONSTRAINT "_CountryToCurrency_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CountryToCurrency" ADD CONSTRAINT "_CountryToCurrency_B_fkey" FOREIGN KEY ("B") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
