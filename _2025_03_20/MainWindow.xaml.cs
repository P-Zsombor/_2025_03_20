using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace _2025_03_20
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        ServerConnection connection;
        public MainWindow()
        {
            InitializeComponent();
            Start();
        }
        void Start()
        {
            connection = new ServerConnection("http://127.1.1.1:3000");
        }
        async void LoginClick(object s, EventArgs e)
        {
            bool valami = await connection.Login(usernameInput.Text, passwordInput.Password);
            if (valami)
            {
                MessageBox.Show("Logged in");
                Window1 a = new Window1(connection) { Top = this.Top, Left = this.Left, Visibility = Visibility.Visible };
                this.Hide();
                a.Closing += (ss, ee) =>
                {
                    this.Show();
                };
            }
        }
        async void RegisterClick(object s, EventArgs e)
        {
            bool valami = await connection.Register(usernameInput.Text, passwordInput.Password);
            if (valami)
            {
                MessageBox.Show("Registered in");
            }
        }
    }
}
