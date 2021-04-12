IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210410210101_v0.1')
BEGIN
    CREATE TABLE [TarjetaCredito] (
        [Id] int NOT NULL IDENTITY,
        [Titular] nvarchar(max) NOT NULL,
        [NumeroTarjeta] nvarchar(max) NOT NULL,
        [FechaExpiracion] nvarchar(max) NOT NULL,
        [CVV] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_TarjetaCredito] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210410210101_v0.1')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210410210101_v0.1', N'5.0.5');
END;
GO

COMMIT;
GO

