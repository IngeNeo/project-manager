import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoInscripcion } from 'utils/enums';
import ReactLoading from 'react-loading';
import Banner from 'media/banner-edicion-inscripciones.png';

const EditarInscripciones = () => {
	const navigate = useNavigate();
	const { form, formData, updateFormData } = useFormData(null);
	const { _id } = useParams();

	const {
		data: queryData,
		error: queryError,
		loading: queryLoading,
	} = useQuery(GET_USUARIO, {
		variables: { _id },
	});

	const [
		editarUsuario,
		{ data: mutationData, loading: mutationLoading, error: mutationError },
	] = useMutation(EDITAR_USUARIO);

	const submitForm = (e) => {
		e.preventDefault();
		editarUsuario({
			variables: { _id, ...formData },
		});

		navigate('/admin/musuarios');
	};

	useEffect(() => {
		if (mutationData) {
			toast.success('Usuario modificado correctamente');
		}
	}, [mutationData]);

	useEffect(() => {
		if (mutationError) {
			toast.error('Error modificando el usuario');
		}

		if (queryError) {
			toast.error('Error consultando el usuario');
		}
	}, [queryError, mutationError]);

	if (queryLoading)
		return (
			<ReactLoading
				type='spinningBubbles'
				color='#0040FF'
				height={667}
				width={375}
			/>
		);

	return (
		<div className='flex flex-col items-center min-h-screen py-2 bg-white'>
			<div>
				<img src={Banner} alt='Inscripciones' className='w-full mb-10 h-30' />
			</div>
			<form
				ref={form}
				onChange={updateFormData}
				onSubmit={submitForm}
				className='flex flex-col w-1/5 bg-white'
			>
				<label className='flex flex-col py-1' htmlFor='nombres'>
					<label className='mx-2 font-semibold'>Proyecto</label>
					<input
						name='nombres'
						type='text'
						required
						defaultValue={queryData.Usuario.nombres}
						className='p-2 m-2 bg-white border-2 border-t-4 border-gray-300 rounded-md shadow-inner'
					/>
				</label>
				<label className='flex flex-col py-1' htmlFor='apellidos'>
					<label className='mx-2 font-semibold'>Estudiante</label>
					<input
						name='apellidos'
						type='text'
						required
						defaultValue={queryData.Usuario.apellidos}
						className='p-2 m-2 bg-white border-2 border-t-4 border-gray-300 rounded-md shadow-inner'
					/>
				</label>
				<div className='grid grid-cols-1 mx-2 font-semibold rounded-md '>
					<DropDown
						label='Estado de la inscripcion:'
						name='estado'
						required
						options={Enum_EstadoInscripcion}
					/>
				</div>
				<ButtonLoading
					disabled={Object.keys(formData).length === 0}
					loading={mutationLoading}
					text='Confirmar'
				/>
			</form>
		</div>
	);
};

export default EditarInscripciones;
