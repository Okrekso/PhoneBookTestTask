using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Contact : IFakeble<Contact>
    {
        [Key]
        public int contactId { get; set; }
        public String firstName { get; set; }
        public String secondName { get; set; }
        public String phone { get; set; }
        public byte[] avatar { get; set; }

        protected override void SetupFakerRules()
        {
            faker.RuleFor(e => e.firstName, f => f.Name.FirstName());
            faker.RuleFor(e => e.secondName, f => f.Name.LastName());
            faker.RuleFor(e => e.phone, f => f.Phone.PhoneNumber());
            faker.RuleFor(e => e.avatar, f => {
                string imgUrl = f.Image.PlaceImgUrl(category: "People", width: 100, height: 100);
                var webClient = new WebClient();
                return webClient.DownloadData(imgUrl);
            });
        }
    }
}
