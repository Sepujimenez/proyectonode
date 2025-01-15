import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateProjectDialog } from '../create-project-dialog';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: jest.fn(() => Promise.resolve({ error: null }))
    })),
    auth: {
      getUser: jest.fn(() => Promise.resolve({ data: { user: { id: '123' } } }))
    }
  }))
}));

describe('CreateProjectDialog', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('abre el diálogo al hacer click en el botón', () => {
    render(<CreateProjectDialog onSuccess={mockOnSuccess} />);
    const button = screen.getByText('Nuevo Proyecto');
    fireEvent.click(button);
    expect(screen.getByText('Crear Nuevo Proyecto')).toBeInTheDocument();
    expect(screen.getByText(/Crea un nuevo proyecto/)).toBeInTheDocument();
  });

  it('muestra error cuando el nombre está vacío', async () => {
    render(<CreateProjectDialog onSuccess={mockOnSuccess} />);
    const button = screen.getByText('Nuevo Proyecto');
    fireEvent.click(button);
    
    const submitButton = screen.getByText('Crear Proyecto');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('crea un proyecto exitosamente', async () => {
    render(<CreateProjectDialog onSuccess={mockOnSuccess} />);
    const button = screen.getByText('Nuevo Proyecto');
    fireEvent.click(button);
    
    const nameInput = screen.getByLabelText('Nombre del Proyecto');
    const descInput = screen.getByLabelText('Descripción');
    
    fireEvent.change(nameInput, { target: { value: 'Mi Proyecto' } });
    fireEvent.change(descInput, { target: { value: 'Descripción del proyecto' } });
    
    const submitButton = screen.getByText('Crear Proyecto');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(createClientComponentClient).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('maneja errores de autenticación', async () => {
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    
    jest.mocked(createClientComponentClient).mockImplementation(() => ({
      from: jest.fn(),
      auth: {
        getUser: jest.fn(() => Promise.resolve({ data: { user: null } }))
      },
      supabaseUrl: '',
      supabaseKey: '',
      realtime: {} as any,
      realtimeUrl: '',
      rest: {} as any
    } as any));

    render(<CreateProjectDialog onSuccess={mockOnSuccess} />);
    const button = screen.getByText('Nuevo Proyecto');
    fireEvent.click(button);
    
    const nameInput = screen.getByLabelText('Nombre del Proyecto');
    fireEvent.change(nameInput, { target: { value: 'Mi Proyecto' } });
    
    const submitButton = screen.getByText('Crear Proyecto');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledWith('No user authenticated');
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });

    mockConsoleError.mockRestore();
  });
}); 