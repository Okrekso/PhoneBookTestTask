using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Backend
{
    public class ApplicationContext : DbContext
    {
        const int AMOUNT_OF_DATA_GENERATED = 100;
        public DbSet<Contact> Contacts { get; set; }

        private string dbname { get; set; }

        public void fillDatabaseRandomly()
        {
            Contacts.AddRange(new Contact().Generate(AMOUNT_OF_DATA_GENERATED));
            this.SaveChanges();
        }

        private void DatabaseConfigurations()
        {
            bool isCreated = Database.EnsureCreated();
            if(isCreated)
            {
                fillDatabaseRandomly();
            }
            Database.SetCommandTimeout(300);
        }
        public ApplicationContext(string dbname)
        {
            this.dbname = dbname;
            DatabaseConfigurations();
        }

        public ApplicationContext(DbContextOptions options) : base(options)
        {
            this.dbname = "PhoneBookDB";
            DatabaseConfigurations();
        }

        public ApplicationContext()
        {
            this.dbname = "PhoneBookDB";
            DatabaseConfigurations();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer($"Data Source=(local)\\SQLEXPRESS;Initial Catalog={dbname};Integrated Security=True");
        }
    }
}
