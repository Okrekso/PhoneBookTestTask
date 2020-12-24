using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bogus;

namespace Backend
{
    public abstract class IFakeble<T> where T : class
    {
        protected Faker<T> faker = new Faker<T>();
        protected abstract void SetupFakerRules();
        public List<T> Generate(int amount)
        {
            List<T> toAdd = new List<T>();
            for (int i = 0; i < amount; i++)
                toAdd.Add(faker.Generate());
            return toAdd;
        }

        public IFakeble()
        {
            SetupFakerRules();
        }
    }
}
