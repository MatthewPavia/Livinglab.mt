namespace KarynPHD
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using KarynPHD.Models;

    public interface ICosmosDbService
    {
        Task AddUserAsync(User user);
    }
}