using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KarynPHD.Models;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Extensions.Configuration;

namespace KarynPHD.Services
{
    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddUserAsync(Models.User user)
        {
            await this._container.CreateItemAsync<Models.User>(user, new PartitionKey(user.username));
        }
  
    }
}
