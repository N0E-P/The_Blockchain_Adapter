const {SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')

//Command details
module.exports = {
    data: new SlashCommandBuilder()
        .setName('view')
        .setDescription('Call a view function')
        .addStringOption(option =>
            option.setName('function')
                .setDescription('Select the function to call')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    
    // Execute a command with values to enter 
    async autocomplete(interaction, client){
        const focusedValue = interaction.options.getFocused();
        const choices = ['nft', 'token', 'metaverse'] //BESOIN D'AJOUTER UN NOMBRE INFINI DE FONCTIONS / RETIRER CETTE LISTE DE LA DATABASE
        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({name: choice, value: choice }))
        );
    },

    async execute(interaction, client){
        const choosenFunction = interaction.options.getString('function'); //This gives the function the user want to call

         //BESOIN D'AJOUTER UN NOMBRE INFINI DE FONCTIONS / RETIRER CETTE LISTE DE LA DATABASE
        const functionsPossibilites = [
            ['nft', 'hashtag'],
            ['token', 'price'], 
            ['metaverse', 'world']]

        //Check what is the function called
        for (var i = 0; i < functionsPossibilites.length; i++){
            if (choosenFunction == functionsPossibilites[i][0]){
                const modal = new ModalBuilder()
                    .setCustomId(choosenFunction)
                    .setTitle(`Call the ${choosenFunction} view function`)
                
                // Add values to enter in the modal
                for (var j=0; j<2; j++){
                    const input = new TextInputBuilder()
                        .setCustomId(functionsPossibilites[i][1])
                        .setLabel(`Enter the ${functionsPossibilites[i][1]}`)
                        .setRequired(true)
                        .setStyle(TextInputStyle.Short)
                    
                    //Add this component to the modal
                    modal.addComponents(new ActionRowBuilder().addComponents(input))
                }

                //Show the modal
                await interaction.showModal(modal);
            } 
        }
    }
}