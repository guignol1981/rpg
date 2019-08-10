import DestinationModel from '../schemas/destination';

module.exports.destinations = () => {
    DestinationModel.create({
        name: 'Selbina',
        isDefault: true
    });

    DestinationModel.create({
        name: 'Bastok'
    });
};
