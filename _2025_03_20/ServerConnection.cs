using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.Windows;

namespace _2025_03_20
{
    public class ServerConnection
    {
        HttpClient client = new HttpClient();
        string serverUrl = "";
        public ServerConnection(string serverUrl)
        {
            this.serverUrl = serverUrl;
        }

        public async Task<bool> Login(string username, string password)
        {
            string url = serverUrl + "/login";
            
            try
            {
                var jsonInfo = new
                {
                    loginUsername = username,
                    loginPassword = password

                };
                string jsonStringified = JsonConvert.SerializeObject(jsonInfo);
                HttpContent sendThis = new StringContent(jsonStringified, Encoding.UTF8, "Application/json");
                HttpResponseMessage response = await client.PostAsync(url, sendThis);
                response.EnsureSuccessStatusCode();
                string result = await response.Content.ReadAsStringAsync();
                JsonData data = JsonConvert.DeserializeObject<JsonData>(result);
                Token.token = data.token;
                return true;
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
            return false;
        }
        public async Task<bool> Register(string username, string password)
        {
            string url = serverUrl + "/register";

            try
            {
                var jsonInfo = new
                {
                    registerUsername = username,
                    registerPassword = password

                };
                string jsonStringified = JsonConvert.SerializeObject(jsonInfo);
                HttpContent sendThis = new StringContent(jsonStringified, Encoding.UTF8, "Application/json");
                HttpResponseMessage response = await client.PostAsync(url, sendThis);
                response.EnsureSuccessStatusCode();
                string result = await response.Content.ReadAsStringAsync();
                JsonData data = JsonConvert.DeserializeObject<JsonData>(result);
                return true;
            }
            catch (Exception e)
            {

                MessageBox.Show(e.Message);
            }
            return false;
        }

        public async Task<List<string>> Profiles()
        {
            List<string> all = new List<string>();
            string url = serverUrl + "/profiles";
            try
            {
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string result = await response.Content.ReadAsStringAsync();
                all = JsonConvert.DeserializeObject<List<JsonData>>(result).Select(item => item.username).ToList();
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }

            return all;
        }
    }
}
