using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FBTarjeta.Models;
using Microsoft.EntityFrameworkCore;

namespace FBTarjeta
{
    public class AplicationDbContext: DbContext
    {
        DbSet<TarjetaCredito> TarjetaCredito { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }
    }
}
