const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    REST,
    Routes
} = require('discord.js');

// UDFYLD DISSE
const TOKEN = "MTUzMDQwNjQ0NzU3NjM4MzcxNg.GNjBcW.4gqVRbwtGTpFvmTYhiIpapPZ2mwwHOoN0i9VrA";
const CLIENT_ID = "1530406447576383716";
const GUILD_ID = "1530290276483072040";

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Opret /radio kommandoen
const commands = [
    new SlashCommandBuilder()
        .setName("radio")
        .setDescription("Få en tilfældig radiofrekvens")
].map(command => command.toJSON());

// Registrer slash-kommandoen
const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("Registrerer slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log("Slash commands registreret!");
    } catch (error) {
        console.error(error);
    }
})();

client.once("ready", () => {
    console.log(`${client.user.tag} er online!`);
});

// /radio
client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "radio") {

        const frequency = (Math.random() * 1000)
            .toFixed(2)
            .padStart(6, "0");

        await interaction.reply({
            embeds: [
                {
                    color: 0x8A2BE2,
                    title: "📻 Radio",
                    description: `Din radiofrekvens er\n\n**${frequency}**`,
                    footer: {
                        text: "3rd Street Saints"
                    },
                    timestamp: new Date()
                }
            ]
        });

    }

});

client.login(TOKEN);
